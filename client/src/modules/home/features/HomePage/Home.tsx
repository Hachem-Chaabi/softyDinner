import Quote from '../../components/Quote/Quote'
import Dinner from '../../components/Dinner/Dinner'
import Dishes from '../../components/Dishes/Dishes'
import DinnerTickets from '../../../shared/components/DinnerTickets/DinnerTickets'
import DonationHistory from '../../../shared/components/DonationHistory/DonationHistory'
import Spinner from '../../../shared/components/Spinner/Spinner'

import { useGetUserQuery } from '../../data/home'
import { useMediaQuery } from '@mui/material'

function Home() {
  const breakpoint_of_930 = useMediaQuery('(max-width:930px)')

  const { data, isLoading } = useGetUserQuery({})
  const user = data?.data?.user

  if (isLoading) return <Spinner />

  return (
    <div className="home">
      <div className="left_side">
        <div className="user_name">Hey, {user?.name.split(' ')[0]}</div>
        <div className="boxes_list">
          <Quote />
          <Dinner userId={user?._id} />
          <Dishes />
        </div>
      </div>

      {!breakpoint_of_930 && (
        <div className="right_side">
          <div className="right_side_container">
            <DinnerTickets />
            <DonationHistory />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
