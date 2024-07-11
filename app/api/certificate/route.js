import { formateMyDate } from "@/lib/formatMyDate";
import { getLoggedInUser } from "@/lib/loggedInUser";
import { getCourseDetails } from "@/quries/course";
import { getAReport } from "@/quries/report";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get("courseId");
    if (!courseId) {
      throw new Error("Course ID is missing");
    }
    const course = await getCourseDetails(courseId);
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) {
      throw new Error("Logged in user details not found");
    }

    const report = await getAReport({
      course: courseId,
      student: loggedInUser.id,
    });

    const completionDate = report?.completed_at
      ? formateMyDate(report?.completed_at)
      : formateMyDate(Date.now());

    const completionInfo = {
      name: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
      completionDate: completionDate,
      courseName: course.title,
      instructor: `${course?.instructor?.firstName} ${course?.instructor?.lastName}`,
      instructorDesignation: `${course?.instructor?.designation}`,
      sign: "/sign.png",
    };

    const kamalFontUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/kalam/Kalam-Regular.ttf`;
    const kalamFontBytes = await fetch(kamalFontUrl).then((res) =>
      res.arrayBuffer()
    );
    if (!kalamFontBytes) {
      throw new Error("Failed to fetch Kalam font");
    }

    const montserratItalicFontUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/montserrat/Montserrat-Italic.ttf`;

    const montserratItalicFontBytes = await fetch(montserratItalicFontUrl).then(
      (res) => res.arrayBuffer()
    );
    if (!montserratItalicFontBytes) {
      throw new Error("Failed to fetch Montserrat Italic font");
    }

    const montserratFontUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/fonts/montserrat/Montserrat-Medium.ttf`;
    const montserratFontBytes = await fetch(montserratFontUrl).then((res) =>
      res.arrayBuffer()
    );
    if (!montserratFontBytes) {
      throw new Error("Failed to fetch Montserrat font");
    }
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
    const montserratItalic = await pdfDoc.embedFont(montserratItalicFontBytes);
    const montserrat = await pdfDoc.embedFont(montserratFontBytes);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage([841.89, 595.28]);
    const { width, height } = page.getSize();

    const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;
    const logoResponse = await fetch(logoUrl);
    const logoContentType = logoResponse.headers.get("content-type");

    if (!logoResponse.ok || !logoContentType.startsWith("image/png")) {
      throw new Error("Failed to fetch logo or invalid content type");
    }
    const logoBytes = await logoResponse.arrayBuffer();
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDims = logo.scale(0.5);

    page.drawImage(logo, {
      x: width / 2 - logoDims.width / 2,
      y: height - 120,
      width: logoDims.width,
      height: logoDims.height,
    });

    const titleFontSize = 30;
    const titleText = "Certificate Of Completion";
    const titleTextWidth = montserrat.widthOfTextAtSize(
      titleText,
      titleFontSize
    );

    page.drawText(titleText, {
      x: width / 2 - titleTextWidth / 2,
      y: height - (logoDims.height + 125),
      size: titleFontSize,
      font: montserrat,
      color: rgb(0, 0.53, 0.71),
    });

    const nameLabelText = "This certificate is hereby bestowed upon";
    const nameLabelFontSize = 20;
    const nameLabelTextWidth = montserratItalic.widthOfTextAtSize(
      nameLabelText,
      nameLabelFontSize
    );

    page.drawText(nameLabelText, {
      x: width / 2 - nameLabelTextWidth / 2,
      y: height - (logoDims.height + 170),
      size: nameLabelFontSize,
      font: montserratItalic,
      color: rgb(0, 0, 0),
    });

    const nameText = completionInfo.name;
    const nameFontSize = 40;
    const nameTextWidth = timesRomanFont.widthOfTextAtSize(
      nameText,
      nameFontSize
    );

    page.drawText(nameText, {
      x: width / 2 - nameTextWidth / 2,
      y: height - (logoDims.height + 220),
      size: nameFontSize,
      font: kalamFont,
      color: rgb(0, 0, 0),
    });

    const detailsText = `This is to certify that ${completionInfo.name} successfully completed the ${completionInfo.courseName} course on ${completionInfo.completionDate} by ${completionInfo.instructor}`;
    const detailsFontSize = 16;

    page.drawText(detailsText, {
      x: width / 2 - 700 / 2,
      y: height - 330,
      size: detailsFontSize,
      font: montserrat,
      color: rgb(0, 0, 0),
      maxWidth: 700,
    });

    const signatureBoxWidth = 300;
    page.drawText(completionInfo.instructor, {
      x: width - signatureBoxWidth,
      y: 90,
      size: detailsFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(completionInfo.instructorDesignation, {
      x: width - signatureBoxWidth,
      y: 72,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      maxWidth: 250,
    });

    page.drawLine({
      start: { x: width - signatureBoxWidth, y: 110 },
      end: { x: width - 60, y: 110 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    const signUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${completionInfo.sign}`;
    const signResponse = await fetch(signUrl);
    const signContentType = signResponse.headers.get("content-type");

    if (!signResponse.ok || !signContentType.startsWith("image/png")) {
      throw new Error("Failed to fetch signature or invalid content type");
    }
    const signBytes = await signResponse.arrayBuffer();
    const sign = await pdfDoc.embedPng(signBytes);

    page.drawImage(sign, {
      x: width - signatureBoxWidth,
      y: 120,
      width: 180,
      height: 54,
    });

    const patternUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/pattern.jpg`;

    const patternBytes = await fetch(patternUrl).then((res) =>
      res.arrayBuffer()
    );
    const pattern = await pdfDoc.embedJpg(patternBytes);

    page.drawImage(pattern, {
      x: 0,
      y: 0,
      width: width,
      height: height,
      opacity: 0.2,
    });

    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
      headers: { "content-type": "application/pdf" },
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while generating the PDF", {
      status: 500,
    });
  }
}
