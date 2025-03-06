const NFCScanner: React.FC<{
    onData: (data: any) => void;
  }> = ({ onData }) => {
    const scanNFC = async () => {
      if ("NDEFReader" in window) {
        try {
          const ndef = new (window as any).NDEFReader();
          await ndef.scan();
          ndef.onreading = (event: any) => {
            const decoder = new TextDecoder();
            for (const record of event.message.records) {
              const jsonData = decoder.decode(record.data);
              const parsedData = JSON.parse(jsonData);
              onData(parsedData);
            }
          };
        } catch (error) {
          console.error("NFC scan failed:", error);
        }
      } else {
        alert("NFC not supported on this device.");
      }
    };

    return (
      <div>
        <button onClick={scanNFC}>Scan NFC</button>
      </div>
    );
  };

export default NFCScanner;