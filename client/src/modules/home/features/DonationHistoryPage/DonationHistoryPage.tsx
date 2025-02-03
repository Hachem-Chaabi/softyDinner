import leftArrowIcon from '/arrow-left.png'

import { Table } from 'antd'
import type { TableProps } from 'antd'
import { useGetDonationHistoryQuery } from '../../data/home'
import { useNavigate, useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { DataType, IDonation } from '../../data/types'

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Recipient Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Identifier',
    dataIndex: 'identifier',
    key: 'id',
  },
  {
    title: 'Tickets',
    dataIndex: 'points',
    key: 'tickets',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
]

function DonationHistoryPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, error } = useGetDonationHistoryQuery(id)

  const userDonations = data?.data?.filter((donation: IDonation) => donation.donor._id === id)
  const donationHistoryData = userDonations?.reverse()

  const useData: DataType[] =
    donationHistoryData?.map((donation: IDonation) => ({
      key: donation._id,
      name: donation.recipient.name,
      identifier: donation.recipient.identifier,
      points: donation.points,
      date: format(parseISO(donation.createdAt), 'dd-MM-yyyy'),
      time: format(parseISO(donation.createdAt), 'HH:mm'),
    })) || []

  const navigateBack = () => {
    navigate(-1)
  }

  return (
    <div className="donation_history_page">
      <div className="header">
        <h3>Donation History</h3>
        <div onClick={navigateBack} className="go_back_btn">
          <img src={leftArrowIcon} alt="left arrow icon" />
          <p>Back</p>
        </div>
      </div>

      <div className="body">
        <Table<DataType> columns={columns} dataSource={useData} loading={isLoading} />
      </div>
    </div>
  )
}

export default DonationHistoryPage
