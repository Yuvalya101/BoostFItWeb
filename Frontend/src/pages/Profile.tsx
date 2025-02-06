import { useUser } from "../context/Auth.context";

export default function Proflie() {
  const { user } = useUser();
  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <img src={user?.image} alt="profile" className="rounded-full w-32 h-32" />
          <h1 className="text-2xl font-bold mt-4">{user?.name}</h1>
          <p className="text-gray-500">
            <span className="font-bold">Email:</span>

            {user?.email}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Username:</span>
            {user?.name}
          </p>

          <p className="text-gray-500">
            <span className="font-bold">Post count:</span>
            {user?.posts.length}
          </p>
        </div>
      </div>
    </div>
  );
}
