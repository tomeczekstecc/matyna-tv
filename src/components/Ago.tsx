import {formatDistance} from "date-fns";
import pl from "date-fns/locale/pl";

const Ago = ({createdAt, user}) => {


  return (
    <div>
      {user && <span className="mb-3 font-semibold italic text-gray-700 dark:text-gray-400">{user}{" "}- </span>}
      <span className="mb-3 font-semibold italic text-gray-700 dark:text-gray-400">
              {formatDistance(new Date(createdAt || '1970-01-01'), new Date(), {
                locale: pl,
                addSuffix: true,
              })}
            </span>
    </div>)
}

export default Ago
