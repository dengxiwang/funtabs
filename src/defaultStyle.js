import './funtabs.css';
import LinkCard from './linkCard';
import Markdown from './markdown';
import Note from './note';
import { default as TimeProgress } from './timeProgress';
import Translate from './translate';

const DefaultStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, widthNum, heightNum, cardStyle } = props;

    const howToShow = () => {
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
                    />
                </div>
            )
        } else if (item.type === 'note') {
            return (
                <div
                    className={`grid-item23`}
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
                        edit={edit}
                        widthNum={widthNum}
                        heightNum={heightNum}
                        cardStyle={cardStyle}
                        linkList={linkList}
                        item={item}
                        setLinkList={setLinkList}
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
                    />
                </div>
            )
        } else if (item.type === 'translatelite') {
            return (
                <div
                    className={`grid-item23`}
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
                    />
                </div>
            )
        }
    }

    return (
        howToShow()
    )
}

export default DefaultStyle;