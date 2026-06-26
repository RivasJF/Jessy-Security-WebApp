import type { Account } from '../../../Shared/Types/Domain/account/Account.type'

export default function TargetAccount({account}: {account: Account}) {
  return (
    <div className="flex flex-col py-2 bg-green-600 rounded-lg shadow-md p-4 mb-4 w-full max-w-md">
       <div className="text-xl font-bold mb-2">{account.title}</div> 
       <div className="mb-2"><span className="font-bold">Username:</span> <span>{account.username}</span></div>
       <div className="mb-2"><span className="font-bold">Description:</span> {account.description}</div>
       <div className="mb-2"><span className="font-bold">Category:</span> {account.category}</div>
    </div>
  )
}
  