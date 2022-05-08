import { useRecoilValue } from 'recoil';
import Collate from '../features/collate/Collate';
import Crop from '../features/crop/Crop';
import Upload from '../features/upload/Upload';
import { uploadImageStore } from '../stores';
import Layout from './layout';

const ContentFactory = () => {
    const uploadImage = useRecoilValue(uploadImageStore);
    const getLeftComp = () => {
        if (uploadImage) {
            return <Crop />;
        }
        return <Upload />;
    };
    const getRightComp = () => {
        return <Collate />;
    };
    return <Layout leftComp={getLeftComp()} rightComp={getRightComp()} />;
};

export default ContentFactory;
