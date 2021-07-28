import { useState, useEffect } from "react";
const { TabixIndexedFile } = require("@gmod/tabix");
const { RemoteFile } = require("generic-filehandle");

export default function App() {
  const [header, setHeader] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const URL =
          "https://ftp.ensembl.org/pub/release-104/variation/vcf/homo_sapiens/1000GENOMES-phase_3.vcf.gz";

        const remoteIndexed = new TabixIndexedFile({
          filehandle: new RemoteFile(URL),
          csiFilehandle: new RemoteFile(URL + ".csi"),
        });

        const header = await remoteIndexed.getHeader();
        setHeader(header);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);
  return (
    <div className="App">
      <h1>Testing @gmod/tabix on ensembl vcf+csi</h1>
      {error ? (
        <div style={{ color: "red" }}>{`${error}`}</div>
      ) : !header ? (
        <div>Loading...</div>
      ) : (
        <pre>{header}</pre>
      )}
    </div>
  );
}
