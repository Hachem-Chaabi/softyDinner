import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#424242',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#fff',
}

function SideBarBottom() {
  return (
    <div className="sidebar_bottom">
      <Carousel autoplaySpeed={8000} autoplay adaptiveHeight arrows infinite>
        <div>
          <div style={contentStyle}>
            <p className="content_title"> : باب التسمية</p>
            <p className="content_description">
              قالَ رسولُ اللَّه ﷺ: إِذَا أكَلَ أَحَدُكُمْ فَليَذْكُر اسْمَ اللَّه تَعَالَى، فإنْ
              نَسِيَ أَنْ يَذْكُرَ اسْمَ اللَّه تَعَالَى في أَوَّلِهِ فَلْيَقُلْ: بِسْمِ اللَّه
              أَوَّلَهُ وَآخِرَهُ
            </p>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <p className="content_title"> : باب الحمد</p>
            <p className="content_description">
              قالَ رسولُ اللَّه ﷺ: إِنَّ اللَّهَ لَيَرْضَى عَنْ الْعَبْدِ أَنْ يَأْكُلَ الْأَكْلَةَ
              فَيَحْمَدَهُ عَلَيْهَا، أَوْ يَشْرَبَ الشَّرْبَةَ فَيَحْمَدَهُ عَلَيْهَا
            </p>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <p className="content_title"> : باب البركة في الطعام</p>
            <p className="content_description">
              قالَ رسولُ اللَّهِ ﷺ: اجتَمِعوا علَى طَعَامِكُم، واذْكُرُوا اسمَ اللَّهِ علَيهِ،
              يُبَارَكْ لَكُم فِيهِ
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default SideBarBottom
