type imageProps = {
  rowOneFirst: string;
  rowOneSecond: string;
  rowTwoFirst: string;
  rowTwoSecond: string;
  titleFirst: string;
  titleSecond: string;
}

export default function WelcomeRPS(props: imageProps) {

  const mTop = props.titleFirst == "" ? 310 : 100;

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        fontSize: 32,
        fontWeight: 600,
        color: "#fff",
        backgroundImage: 'url(https://ipfs.io/ipfs/QmWfMMZnnrTiyXknqDEFt4gMNjkxz5bvRMYdwsuPH2C3R4)',
      }}
    >

      {props.titleFirst == "" ?
        <></> :
        <div style={{ display: 'flex', marginTop: 250, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "black", paddingTop: 10, paddingBottom: 10 }}>
          <div style={{ flexBasis: '43%', justifyContent: 'flex-end', color: '#808080' }}>{props.titleFirst}</div>
          <div style={{ flexBasis: '57%', justifyContent: 'flex-start', paddingLeft: 15 }}>{props.titleSecond}</div>
        </div>
      }


      <div style={{ display: 'flex', marginTop: mTop, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "black", paddingTop: 10, paddingBottom: 10 }}>
        <div style={{ flexBasis: '43%', justifyContent: 'flex-end', color: '#808080' }}>{props.rowOneFirst}</div>
        <div style={{ flexBasis: '57%', justifyContent: 'flex-start', paddingLeft: 15 }}>{props.rowOneSecond}</div>
      </div>
      <div style={{ display: 'flex', marginTop: 0, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "black", paddingTop: 10, paddingBottom: 10 }}>
        <div style={{ flexBasis: '43%', justifyContent: 'flex-end', color: '#808080' }}>{props.rowTwoFirst}</div>
        <div style={{ flexBasis: '57%', justifyContent: 'flex-start', paddingLeft: 15 }}>{props.rowTwoSecond}</div>
      </div>
      <div style={{ display: 'flex', marginTop: 140, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "black", paddingTop: 10, paddingBottom: 20, fontSize: 16 }}>
        <div style={{ flexBasis: '90%', justifyContent: 'flex-end', color: '#808080' }}></div>
        <div style={{ flexBasis: '10%', justifyContent: 'flex-start', paddingLeft: 15 }}>powered by TAVERN protocol</div>
      </div>
    </div>
  )
}