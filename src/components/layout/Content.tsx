import styled from '@emotion/styled'
import React, { FC, ReactNode } from 'react'

interface IProps {
    VerbiageComp: ReactNode,
    SelectionComp: ReactNode,
    DisplayComp: ReactNode
}

const Content: FC<IProps> = ({VerbiageComp, SelectionComp, DisplayComp}) => {
  return (
    <Wrapper>
        <Verbiage>
            {VerbiageComp}
        </Verbiage>
        <Selection>
            {SelectionComp}
        </Selection>
        <Display>
            {DisplayComp}
        </Display>
    </Wrapper>
  )
}

export default Content


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
`

const Verbiage = styled.div`

`

const Selection = styled.div`
`

const Display = styled.div`

`