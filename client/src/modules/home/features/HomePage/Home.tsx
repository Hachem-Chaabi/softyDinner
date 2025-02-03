import Quote from '../../components/Quote/Quote'
import Dinner from '../../components/Dinner/Dinner'
import Dishes from '../../components/Dishes/Dishes'
import DinnerTickets from '../../../shared/components/DinnerTickets/DinnerTickets'
import DonationHistory from '../../../shared/components/DonationHistory/DonationHistory'

import { useAppSelector } from '../../../shared/store'
// import EmptySearch from '../../shared/components/EmptySearch/EmptySearch'

function Home() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div className="home">
      {/* <EmptySearch /> */}
      <div className="left_side">
        <div className="user_name">Hey, {user?.name.split(' ')[0]}</div>
        <div className="boxes_list">
          <Quote />
          <Dinner userId={user?._id} />
          <Dishes />
        </div>
      </div>

      <div className="right_side">
        <div className="right_side_container">
          <DinnerTickets />
          <DonationHistory />
        </div>
      </div>
    </div>
  )
}

export default Home
