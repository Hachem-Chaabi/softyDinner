import { Spin } from 'antd'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface IAvailableDishesSkeleton {
  isLoading: boolean
}

function AvailableDishesSkeleton({ isLoading }: IAvailableDishesSkeleton) {
  return (
    <Spin spinning={isLoading}>
      <div className="available_dishes">
        <div className="header">
          <h3>
            <Skeleton width={150} />
          </h3>
          <div className="go_back_btn">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={50} />
          </div>
        </div>

        <div className="body">
          {[...Array(38)].map((_, index) => (
            <div key={index} className="dish_container">
              <Skeleton style={{ right: '20px' }} height={120} width={120} className="dish_img" />
              <div className="dish_background">
                <div className="dish_name_and_rate">
                  <div className="dish_name">
                    <Skeleton width={100} height={20} />
                    <Skeleton circle width={20} height={20} />
                  </div>
                  <div className="dish_rate">
                    <Skeleton width={50} height={15} />
                    <Skeleton circle width={20} height={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  )
}

export default AvailableDishesSkeleton
