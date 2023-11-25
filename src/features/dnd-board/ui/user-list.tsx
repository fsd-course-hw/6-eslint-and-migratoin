import { Board } from "@/entities/board"
import { getAvatarUrl, useUsers } from "@/entities/user"

export const UserList = ({ board }: {board?: Board}) => {
  const editors = board?.editorsIds
  const getUserById = useUsers((s) => s.getUserById)
  return (
    <div className="flex">{editors?.map((id) => {
      const user = getUserById(id);
      return user && <div key={id}>
        <div className="flex gap-5 items-center">
          <p className="text-lg">{user.name}</p>
          <img className='w-7 h-7' src={getAvatarUrl(user.avatarId)} />
        </div>
      </div>;
    })}</div>
  )
}
