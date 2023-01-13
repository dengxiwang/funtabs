import './funtabs.css';
import LinkCard from './linkCard';
import Markdown from './markdown';
import Note from './note';
import TimeProgress from './timeProgress';
import Translate from './translate';

const OnlyIconStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, widthNum, heightNum, cardStyle, changeGridWidth } = props;

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
                    linkList={linkList}
                    setLinkList={setLinkList}
                    radius={radius}
                    heightNum={heightNum}
                    cardStyle={cardStyle}
                    changeGridWidth={changeGridWidth}
                />
            </div>
        )
    } else if (item.type === 'note') {
        return (
            <div
                className={`grid-item43`}
                style={{
                    position: 'relative',
                }}
            >
                <Note
                    heightNum={heightNum}
                    edit={edit}
                    cardStyle={cardStyle}
                    id={id}
                    item={item}
                    linkList={linkList}
                    setLinkList={setLinkList}
                    changeGridWidth={changeGridWidth}
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
                    widthNum={widthNum}
                    heightNum={heightNum}
                    cardStyle={cardStyle}
                    linkList={linkList}
                    item={item}
                    setLinkList={setLinkList}
                    changeGridWidth={changeGridWidth}
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
                    linkList={linkList}
                    setLinkList={setLinkList}
                    item={item}
                    cardStyle={cardStyle}
                    changeGridWidth={changeGridWidth}
                />
            </div>
        )
    } else if (item.type === 'translatelite') {
        return (
            <div
                className={`grid-item43`}
                style={{
                    position: 'relative',
                }}>
                <Translate
                    id={id}
                    edit={edit}
                    linkList={linkList}
                    setLinkList={setLinkList}
                    item={item}
                    cardStyle={cardStyle}
                    changeGridWidth={changeGridWidth}
                />
            </div>
        )
    }
}

export default OnlyIconStyle;