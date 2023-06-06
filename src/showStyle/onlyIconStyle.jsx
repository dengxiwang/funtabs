import { Flipped } from 'react-flip-toolkit';
import '../common/funtabs.css';
import Markdown from '../component/markdown';
import Note from '../component/note';
import TimeProgress from '../component/timeProgress';
import Translate from '../component/translate';
import LinkCard from '../module/linkCard';

const OnlyIconStyle = (props) => {
    const {
        id,
        edit,
        item,
        gap,
        num,
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
    } = props;

    function howToShow() {
        if (item.type === 'link') {
            return (
                <div
                    className={`grid-item${item.size}`}
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
                    />
                </div>
            )
        } else if (item.type === 'note') {
            return (
                <div
                    className={`grid-item34`}
                    style={{
                        position: 'relative',
                    }}
                >
                    <Note
                        heightNum={heightNum}
                        edit={edit}
                        cardStyle={cardStyle}
                        id={id}
                        num={num}
                        item={item}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        radius={radius}
                        otherList={otherList}
                        setOtherList={setOtherList}
                        setDisabled={setDisabled}
                    />
                </div>
            )
        } else if (item.type === 'timeProgress') {
            return (
                <div
                    className={`grid-item22`}
                    style={{
                        position: 'relative',
                    }}
                >
                    <TimeProgress
                        id={id}
                        edit={edit}
                        num={num}
                        gap={gap}
                        widthNum={widthNum}
                        heightNum={heightNum}
                        cardStyle={cardStyle}
                        linkList={linkList}
                        item={item}
                        setLinkList={setLinkList}
                        radius={radius}
                        otherList={otherList}
                        setOtherList={setOtherList}
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
                        num={num}
                        edit={edit}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        item={item}
                        cardStyle={cardStyle}
                        radius={radius}
                        click={click}
                        otherList={otherList}
                        setOtherList={setOtherList}
                        setDisabled={setDisabled}
                    />
                </div>
            )
        } else if (item.type === 'translatelite') {
            return (
                <div
                    className={`grid-item34`}
                    style={{
                        position: 'relative',
                    }}>
                    <Translate
                        id={id}
                        num={num}
                        edit={edit}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        item={item}
                        cardStyle={cardStyle}
                        radius={radius}
                        otherList={otherList}
                        setOtherList={setOtherList}
                        setDisabled={setDisabled}
                    />
                </div>
            )
        }
    }

    return (
        <>
            <Flipped flipId={item.type + item.link + item.id} >
                {howToShow()}
            </Flipped>
        </>
    )
}

export default OnlyIconStyle;