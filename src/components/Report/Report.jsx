import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Ul } from '../styled/ul';
import { ReportLi, ReportWrapper, Span, Title } from './styled';


export default function Report({ list }) {
    return (
        <Ul>
            {list.map(list =>
                <ReportLi key={uuidv4()}>
                    <Title>{list.month}</Title>
                    <ReportWrapper>
                        <div>подтягиваний: <Span>{list.counter}</Span></div>
                        <div>приседаний: <Span>{list.squat}</Span></div>
                    </ReportWrapper>
                </ReportLi>)}
        </Ul>
    )
}
