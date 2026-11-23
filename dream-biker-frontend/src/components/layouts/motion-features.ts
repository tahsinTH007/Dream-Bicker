// framer-motion's animation engine (incl. drag for the gallery carousel).
// Loaded as a separate chunk after the page by LazyMotion in motion-provider,
// so it is not part of the JavaScript every page needs before it can run.
import { domMax } from "framer-motion";

export default domMax;
