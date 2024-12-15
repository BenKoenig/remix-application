import {
    type MetaFunction,
} from '@remix-run/node'

import FlightList from '~/components/FlightList'

export const meta: MetaFunction = () => {
    return [
        { title: "Space Flight News" },
        { name: 'description', content: "Latest updates and news on space flights, missions, and exploration." },
    ]
}

export default function Index() {

    return (
        <FlightList />
    )
}
