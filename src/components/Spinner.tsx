
const Spinner: React.FC = ({}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-75">
      <span className="loading loading-spinner loading-lg" />
    </div>
  )
}

export default Spinner;