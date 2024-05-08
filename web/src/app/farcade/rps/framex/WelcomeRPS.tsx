export default function WelcomeRPS() {

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
      <div style={{ display: 'flex', marginTop: 310, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "black", paddingTop: 10, paddingBottom: 10 }}>
        <div style={{ flexBasis: '43%', justifyContent: 'flex-end', color: '#808080' }}>welcome to the </div>
        <div style={{ flexBasis: '57%', justifyContent: 'flex-start', paddingLeft: 15 }}>FARCADE</div>
        <div style={{ display: 'flex', marginTop: 0, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "black", paddingTop: 0, paddingBottom: 0 }}>
          <div style={{ flexBasis: '43%', justifyContent: 'flex-end', color: '#808080' }}>we have </div>
          <div style={{ flexBasis: '57%', justifyContent: 'flex-start', paddingLeft: 15 }}>Rock Paper Scissors</div>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 140, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: "black", paddingTop: 10, paddingBottom: 20, fontSize: 16 }}>
        <div style={{ flexBasis: '90%', justifyContent: 'flex-end', color: '#808080' }}></div>
        <div style={{ flexBasis: '10%', justifyContent: 'flex-start', paddingLeft: 15 }}>powered by TAVERN protocol</div>
      </div>
    </div>
  )
}