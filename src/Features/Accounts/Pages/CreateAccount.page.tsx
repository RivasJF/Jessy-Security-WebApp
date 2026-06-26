

export default function FormAccount() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      FormAccount
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <form className="space-y-6 text-black">
            <div >
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description"></textarea>
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <select id="category" name="category">
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="social-media">Social Media</option>
                </select>   
            </div>

            <div>
                <button type="submit">Create Account</button>
            </div>
        </form>
      </div>
    </div>
  );
}
