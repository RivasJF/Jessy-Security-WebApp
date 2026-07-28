import { useGetListAccounts } from '../hooks/ListAccounts.hook';
import { TargetAccount } from '../..';

export default function DashboardAccount() {
      const {
        data: accountArray,
        isLoading,
        error,
        isSuccess,
      } = useGetListAccounts();
  return (
    <section className="w-full max-w-max px-4 py-6">
        {isLoading && <p>Loading accounts...</p>}
        {error && <p>Error loading accounts</p>}
        {isSuccess && (
          <>
            {accountArray.length === 0 ? (
              <p className="text-center text-gray-400">No accounts found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-8 md:grid-cols-3 gap-5">
                {accountArray.map((acc) => (
                  <TargetAccount key={acc.id} account={acc} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
  )
}
