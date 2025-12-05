import { useWindowDimensions, Platform } from 'react-native';
    
export default function useModalDimensions() {
    const { width, height } = useWindowDimensions();
    return{
        width: Platform.OS === 'web' ? Math.min(450, width * 0.4) : width * 0.9,
        maxHeight: height * 0.9,
        padding: Platform.OS === 'web' ? 32 : 20,
    };
}