import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function DishesSkeleton() {
  return (
    <div className="box_container">
      <div className="box_header">
        <h3 className="title">
          <Skeleton width={150} />
        </h3>
        <p className="see_all_link">
          <Skeleton width={50} />
        </p>
      </div>
      <div className="dishes_box_container">
        <Skeleton style={{ position: 'absolute', left: '-36px' }} circle width={32} height={32} />
        {[...Array(4)].map((_, index) => (
          <div key={index} className="dish_container">
            <Skeleton style={{ right: '10px' }} height={120} width={120} className="dish_img" />
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
        <Skeleton style={{ position: 'absolute', right: '-36px' }} circle width={32} height={32} />
      </div>
    </div>
  )
}

export default DishesSkeleton
