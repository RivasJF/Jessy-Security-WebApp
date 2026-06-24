import { fetchRefreshToken } from '../../../Api/Auth/auth.api'

export default function Test() {


    async function handleSubmit() {
       try{
        const response = await fetchRefreshToken();
        console.log(response)
       } catch (error) {
        console.error(error)
       }
    }

  return (
    <div>
      <button onClick={handleSubmit}>CLICK</button>
    </div>
  )
}
