import {
  Stack, Modal, ModalDialog, Typography, Box,
} from '@mui/joy'

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const QuestionDetailsModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={{ maxWidth: 700, width: '100%', overflowY: 'auto' }}>
        <Typography level="h2">Question Details</Typography>
        <Stack spacing={2} mt={2}>
          <Box>
            <Typography level="h4">Id</Typography>
            <Typography>0</Typography>
          </Box>
          <Box>
            <Typography level="h4">Title</Typography>
            <Typography>Sample title</Typography>
          </Box>
          <Box>
            <Typography level="h4">Description</Typography>
            <Typography>Sample desc</Typography>
          </Box>
          <Box>
            <Typography level="h4">Category</Typography>
            <Typography>Sample category</Typography>
          </Box>
          <Box>
            <Typography level="h4">Complexity</Typography>
            <Typography>easy</Typography>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default QuestionDetailsModal
