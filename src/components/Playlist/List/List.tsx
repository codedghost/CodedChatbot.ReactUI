import {ListProps, SongRequest} from './ListProps';

function List(props: ListProps) {

}

List.defaultProps = {
    currentSong: {} as SongRequest,
    regularQueue: [{}],
    vipQueue: [{}]
} as ListProps

export default List;