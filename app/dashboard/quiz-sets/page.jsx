import { getAllQuizSets } from "@/quries/quizzes";
import { dbConnect } from "@/services/mongo";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
export const dynamic = 'force-dynamic';

const QuizSets = async () => {

  await dbConnect()
  const quizSets = await getAllQuizSets()

  const mappedQuizSets = quizSets.map((quiz) => {
    return {
      id: quiz?.id,
      title: quiz?.title,
      isPublished: quiz?.active,
      totalQuiz: quiz?.quizIds?.length
    }
  })

  return (
    <div className="p-6">
      <DataTable columns={columns} data={mappedQuizSets} />
    </div>
  );
};

export default QuizSets;
