import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faImage,
    faClock,
    faLock,
    faLockOpen,
    faHeart,
    faRetweet
} from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faImage, faClock, faLock, faLockOpen, faHeart, faRetweet)

export { FontAwesomeIcon }