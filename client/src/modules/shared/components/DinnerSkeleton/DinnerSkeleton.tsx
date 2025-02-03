import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css' // Import CSS for skeleton

const DinnerSkeleton = () => {
  return (
    <div className="box_container">
      <h3 className="title">
        <Skeleton width={150} height={20} />
      </h3>
      <div className="box dinner_box">
        <div className="image_and_rate">
          <div className="dinner_image">
            <Skeleton height={130} width={170} />
          </div>
          <div className="dinner_name_and_rate">
            <p className="dinner_name">
              <Skeleton width={80} />
            </p>
            <div className="dinner_rate">
              <p>
                <Skeleton width={40} />
              </p>
              <Skeleton circle width={20} height={20} />
            </div>
          </div>
        </div>
        <div className="timer">
          <Skeleton width={200} height={15} />
          <div className="timer_container">
            <div className="timer_box_container">
              <div className="timer_box_and_dots">
                <div style={{ background: 'transparent' }} className="timer_box">
                  <Skeleton width={50} height={50} />
                </div>
                <div className="dots">
                  <Skeleton width={8} height={8} circle />
                  <Skeleton width={8} height={8} circle />
                </div>
              </div>
            </div>
            <div className="timer_box_container">
              <div className="timer_box_and_dots">
                <div style={{ background: 'transparent' }} className="timer_box">
                  <Skeleton width={50} height={50} />
                </div>
                <div className="dots">
                  <Skeleton width={8} height={8} circle />
                  <Skeleton width={8} height={8} circle />
                </div>
              </div>
            </div>
            <div className="timer_box_container">
              <div className="timer_box_and_dots">
                <div style={{ background: 'transparent' }} className="timer_box">
                  <Skeleton width={50} height={50} />
                </div>
              </div>
            </div>
          </div>

          <div className="timer_names">
            <Skeleton width={50} height={10} />
            <Skeleton width={50} height={10} />
            <Skeleton width={50} height={10} />
          </div>
          <Skeleton width={110} height={40} />
        </div>
      </div>
    </div>
  )
}

export default DinnerSkeleton
