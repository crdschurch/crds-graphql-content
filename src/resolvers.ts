import contentResolver from "./graph/content/content.resolver";
import socialMediaResolver from "./graph/social-media/social-media.resolver";
import { merge } from "lodash";

//merge here with lodash merge if more than one
export default merge(contentResolver, socialMediaResolver);
