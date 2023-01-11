import Paragraph from 'antd/es/typography/Paragraph';
import React, { useState } from 'react';

export default function ShowLabel(props) {
    const { cardStyle, item } = props;
    const [ellipsis] = useState('ture');
    if (cardStyle === 'phoneCard') {
        return (
            <Paragraph
                style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
                ellipsis={
                    ellipsis
                        ? {
                            rows: 1,
                            tooltip: { title: item.label, color: 'blue' }
                        } : false
                }
            >
                {item.label}
            </Paragraph>
        )
    }
}
