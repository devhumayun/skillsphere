import { getAllQuizSets } from "@/quries/quizzes";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const quizSets = [
  {
    id: 1,
    title: "Reactive Accelerator",
    isPublished: true,
    totalQuiz: 10,
    quizes: [],
  },
  {
    id: 2,
    title: "Think In A Redux Way",
    isPublished: false,
    totalQuiz: 50,
    quizes: [],
  },
];
const QuizSets = async () => {

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
