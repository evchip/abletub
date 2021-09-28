import { storeFile } from "./storage";

// keep track of currently selected file
let selectedFile = null;

/**
 * Callback for file input onchange event, fired when the user makes a file selection.
 */
export async function fileSelected(file, postTitle) {
  selectedFile = await makeFileObject(file.target.files);
  const caption = postTitle;
  const res = await storeFile(selectedFile, caption);
  return res;
}

const makeFileObject = async (upload) => {
  return await upload[0].arrayBuffer().then((res) => {
    const blob = new Blob([new Uint8Array(res)], { type: "file" });
    const files = [
      // new File(
      //   [`contents of ${upload![0].name}: ${upload![0]}`],
      //   "plain-utf8.txt"
      // ),
      new File([blob], upload[0].name),
    ];
    return files;
  });
};
