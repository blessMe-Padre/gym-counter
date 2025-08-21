import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Ul } from '../styled/ul';
import { ReportLi, ReportWrapper, Span, Text } from './styled';


export default function Report({ list }) {
    return (
        <Ul>
            {list
                .sort((a, b) => a.id < b.id ? 1 : -1)
                .map(list =>
                    <ReportLi key={uuidv4()}>
                        <ReportWrapper>
                            <Text>{list.month}</Text>
                            <ReportWrapper>
                                <Span>подтягиваний: </Span><Span>{list.counter}</Span>
                            </ReportWrapper>
                        </ReportWrapper>
                    </ReportLi>)
            }
        </Ul>
    )
}
