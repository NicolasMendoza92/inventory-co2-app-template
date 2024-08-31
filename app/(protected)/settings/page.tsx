import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="bg-primary m-2 p-3 border border-primary rounded-md" type="submit">Sing Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
