import { useNavigate } from "react-router-dom"

interface Error500Props {
  error?: Error
}

export const Error500Page = ({ error }: Error500Props) => {
  const navigate = useNavigate()
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">500</h1>
        <p className="text-gray-600">서버 오류가 발생했습니다</p>
        {error && <pre>{error.message}</pre>}
        <button className="btn-primary mt-4 bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => navigate(-1)}>
          뒤로 돌아가기
        </button>
      </div>
    </div>
  )
}

