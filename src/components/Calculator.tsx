import { FC, useState } from 'react'
import { Box, Typography, Modal, Tabs, Tab } from '@mui/material'
import { X as Close, Repeat } from 'react-feather'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  height: '75vh',
  padding: '24px 40px',
  bgcolor: '#707070',
  //   border: '1px solid #9945FF',
  borderRadius: '1rem',
  '&:focus': {
    border: '1px solid #9945FF',
  },
}

const Calculator = ({isOpen, handleClose}:{isOpen: boolean; handleClose: any;}) => {
  const [tab, setTab] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue)
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ROI Calculator
            </Typography>
            <Close onClick={handleClose} className="cursor-pointer" />
          </div>

          {/* Staked block */}
          <div className="flex flex-col justify-between items-start mt-6 w-full">
            <Typography variant="subtitle1">XXXX-XXXX LP staked</Typography>
            <div className="flex justify-between items-center rounded px-5 py-2.5 bg-black bg-opacity-25 mt-2.5 w-full">
              <div className="flex flex-col flex-grow w-1/5">
                <span className="flex items-center text-lg text-white">
                  <label>$</label>
                  <input
                    type="number"
                    className="w-28 text-lg ml-2 text-white bg-transparent border-none focus:ring-0 focus:outline-none"
                    placeholder="0.0"
                  />
                </span>
                <label className="text-sm text-farmText">USD</label>
              </div>
              <Repeat className="cursor-pointer mx-10" />
              <div className="flex flex-col flex-grow w-1/5">
                <span>
                  <input
                    type="number"
                    className="w-28 text-lg text-white bg-transparent border-none focus:ring-0 focus:outline-none"
                    placeholder="0.0"
                  />
                </span>
                <label className="text-sm text-farmText">Shares</label>
              </div>
            </div>
            <div className="flex justify-start items-center h-5 mt-4">
              <button className="mr-1 cursor-pointer border-2 px-1 rounded-lg text-sm">max</button>
              <Typography variant="subtitle2" style={{ marginTop: '1px' }}>
                Shares: 0
              </Typography>
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-col mt-6">
            <Typography variant="subtitle1">Duration</Typography>
            <Tabs
              sx={{ backgroundColor: 'rgba(0,0,0,25%)', borderRadius: '0.8rem', marginTop: '8px' }}
              value={tab}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              variant="fullWidth"
            >
              <Tab label="1D" />
              <Tab label="7D" />
              <Tab label="30D" />
              <Tab label="90D" />
            </Tabs>
          </div>
          {/* ROI */}
          <div className="flex flex-col justify-between items-start mt-6 w-full">
            <div className="flex justify-between items-center w-full">
              <Typography variant="subtitle1">ROI</Typography>
              <Typography variant="subtitle1">- %</Typography>
            </div>
            <div className="flex flex-col justify-start items-center rounded px-5 py-2.5 bg-black bg-opacity-25 mt-2.5 w-full h-48">
              <div className="flex justify-between items-center w-full">
                <Typography variant="subtitle2" style={{color: '#DFDFDE'}}>Shares</Typography>
                <Typography variant="subtitle2" style={{color: '#DFDFDE'}}>- (-%)</Typography>
              </div>
              <div className="flex justify-between items-center w-full mt-6">
                <Typography variant="subtitle2" style={{color: '#DFDFDE'}}>Value of rewards</Typography>
                <Typography variant="subtitle2" style={{color: '#DFDFDE'}}>$ -</Typography>
              </div>
              <div className="flex justify-start items-center w-full mt-6">
                <Typography variant="subtitle2" style={{color: '#DFDFDE'}}>Reward tokens</Typography>
              </div>
            </div>
          </div>

          {/* Stake Button */}
        </Box>
      </Modal>
    </div>
  )
}

export default Calculator
