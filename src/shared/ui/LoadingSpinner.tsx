export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-64px)]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
} 