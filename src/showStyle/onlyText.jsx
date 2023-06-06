import { Flipped } from 'react-flip-toolkit';
import '../common/funtabs.css';
import Markdown from '../component/markdown';
import TimeProgress from '../component/timeProgress';
import LinkCard from '../module/linkCard';

const OnlyText = (props) => {
  const {
    id,
    edit,
    item,
    num,
    gap,
    linkList,
    setLinkList,
    radius,
    widthNum,
    heightNum,
    cardStyle,
    linkOpen,
    click,
    setDisabled,
    otherList,
    setOtherList,
    fontColor
  } = props;

  function howToShow() {
    if (item.type === 'link') {
      return (
        <div
          className={`grid-item11`}
          style={{
            position: 'relative',
          }}>
          <LinkCard
            id={id}
            edit={edit}
            item={item}
            num={num}
            linkList={linkList}
            setLinkList={setLinkList}
            radius={radius}
            heightNum={heightNum}
            cardStyle={cardStyle}
            linkOpen={linkOpen}
            click={click}
            otherList={otherList}
            setOtherList={setOtherList}
            setDisabled={setDisabled}
            fontColor={fontColor}
          />
        </div>
      )
    } else if (item.type === 'timeProgress') {
      return (
        <div
          className={`grid-item11`}
          style={{
            position: 'relative',
          }}>
          <TimeProgress
            id={id}
            gap={gap}
            edit={edit}
            widthNum={widthNum}
            heightNum={heightNum}
            num={num}
            cardStyle={cardStyle}
            linkList={linkList}
            item={item}
            setLinkList={setLinkList}
            radius={radius}
            otherList={otherList}
            setOtherList={setOtherList}
            fontColor={fontColor}
          />
        </div>
      )
    } else if (item.type === 'markdown') {
      return (
        <div
          className={`grid-item11`}
          style={{
            position: 'relative',
          }}>
          <Markdown
            id={id}
            edit={edit}
            num={num}
            linkList={linkList}
            setLinkList={setLinkList}
            item={item}
            cardStyle={cardStyle}
            radius={radius}
            click={click}
            otherList={otherList}
            setOtherList={setOtherList}
            setDisabled={setDisabled}
            fontColor={fontColor}
          />
        </div>
      )
    }
  }

  return (
    <>
      <Flipped flipId={item.type + item.link + item.id}>
        {howToShow()}
      </Flipped>
    </>
  )
}

export default OnlyText;