import './funtabs.css';
import LinkCard from './linkCard';
import Markdown from './markdown';
import Note from './note';
import TimeProgress from './timeProgress';
import Translate from './translate';

const PhoneStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, widthNum, heightNum, cardStyle, changeGridWidth } = props;

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
                    margin: '0px 11px 22px 11px'
                }}>
                <Note
                    heightNum={heightNum - 22}
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
                    margin: '0px 11px 22px 11px'
                }}
            >
                <TimeProgress
                    widthNum={widthNum - 22}
                    heightNum={heightNum - 22}
                    id={id}
                    edit={edit}
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
                    margin: '0px 11px 22px 11px'
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
                    margin: '0px 11px 22px 11px',
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

export default PhoneStyle;