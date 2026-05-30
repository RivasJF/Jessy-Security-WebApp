
export default function FormNotice() {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
    }
  return (
    <div className="bg-green-900 flex flex-col rounded-lg shadow-lg p-6 self-start">
        <h1 className="text-2xl font-bold mb-4">Form Notice</h1>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="message" className="block mb-2 font-medium">Mensaje:</label>
            <input type="text" id="message" name="message" className="border border-gray-300 rounded px-3 py-2 mb-4 w-full" />
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Enviar</button>
        </form>
    </div>
  )
}
