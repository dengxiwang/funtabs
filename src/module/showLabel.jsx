import Paragraph from 'antd/es/typography/Paragraph';
import React, { useState } from 'react';
import ShowLabelFontColor from '../common/showLabelFontColor';

export default function ShowLabel(props) {
    const { cardStyle, item, edit } = props;
    const [ellipsis] = useState('ture');
    if (cardStyle === 'phoneCard') {
        return (
            <Paragraph
                style={{
                    fontWeight: 'bold',
                    fontSize: '12px',
                    marginBottom: '0px',
                    textAlign: 'center',
                    color: ShowLabelFontColor(),
                    mixBlendMode: 'difference'
                }}
                ellipsis={
                    ellipsis
                        ? {
                            rows: 1,
                            tooltip: edit === 'none' ? {
                                title: item.label,
                                color: 'blue'
                            } : false
                        } : false
                }
            >
                {item.label}
            </Paragraph>
        )
    }
}
