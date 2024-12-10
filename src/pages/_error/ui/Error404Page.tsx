import { useNavigate } from 'react-router-dom'

export const Error404Page = () => {
  const navigate = useNavigate()
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">404</h1>
        <p className="text-gray-600">페이지를 찾을 수 없습니다</p>
        <button className="btn-primary mt-4 bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => navigate(-1)}>
          뒤로 돌아가기
        </button>
      </div>
    </div>
  )
}