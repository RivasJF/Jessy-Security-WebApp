import { CreateAccountForm } from "../../Features";

export default function FormAccount() {
  return (
    <section className="flex flex-col items-center min-h-screen min-w-screen">
      <header className="fixed w-full text-white p-4">
        <h2 className="text-2xl font-bold text-center">FormAccount</h2>
      </header>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <div className="h-full w-full rounded-lg bg-white p-8 shadow-lg">
          <CreateAccountForm />
        </div>
      </section>
    </section>
  );
}
