import { Flipped } from 'react-flip-toolkit';
import '../common/funtabs.css';
import Markdown from '../component/markdown';
import Note from '../component/note';
import TimeProgress from '../component/timeProgress';
import Translate from '../component/translate';
import LinkCard from '../module/linkCard';

const PhoneStyle = (props) => {
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
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
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
                        margin: '0px 11px 22px 11px'
                    }}>
                    <Note
                        heightNum={heightNum - 22}
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
                        margin: '0px 11px 22px 11px'
                    }}
                >
                    <TimeProgress
                        widthNum={widthNum - 22}
                        heightNum={heightNum - 22}
                        id={id}
                        num={num}
                        edit={edit}
                        gap={gap}
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
                        margin: '0px 11px 22px 11px'
                    }}>
                    <Markdown
                        id={id}
                        edit={edit}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        item={item}
                        num={num}
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
                        margin: '0px 11px 22px 11px',
                        position: 'relative',
                    }}>
                    <Translate
                        id={id}
                        edit={edit}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        item={item}
                        num={num}
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

export default PhoneStyle;