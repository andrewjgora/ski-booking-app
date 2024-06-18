
const Spinner = ({ fullScreen }: { fullScreen?: boolean}) => {
  const classes = fullScreen ? 'fixed inset-0 z-50 bg-opacity-75' : 'w-full h-full';
  return (
    <div className={`flex items-center justify-center bg-gray-100 ${classes}`}>
      <span className="loading loading-spinner loading-lg" />
    </div>
  )
}

export default Spinner;