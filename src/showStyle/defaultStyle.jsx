import { Flipped } from 'react-flip-toolkit';
import '../common/funtabs.css';
import Markdown from '../component/markdown';
import Note from '../component/note';
import TimeProgress from '../component/timeProgress';
import Translate from '../component/translate';
import LinkCard from '../module/linkCard';

const DefaultStyle = (props) => {
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
                    className={`grid-item32`}
                    style={{
                        position: 'relative',
                    }}
                >
                    <Note
                        heightNum={heightNum}
                        edit={edit}
                        num={num}
                        cardStyle={cardStyle}
                        id={id}
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
                    className={`grid-item21`}
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
                    />
                </div>
            )
        } else if (item.type === 'translatelite') {
            return (
                <div
                    className={`grid-item32`}
                    style={{
                        position: 'relative',
                    }}>
                    <Translate
                        id={id}
                        edit={edit}
                        num={num}
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
            <Flipped flipId={item.type + item.link + item.id}>
                {howToShow()}
            </Flipped>
        </>
    )
}

export default DefaultStyle;