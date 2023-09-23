import {
  Stack, Modal, ModalDialog, Typography, Box, Chip,
} from '@mui/joy'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { selectCurrentQuestion } from '../selectors'
import { useAppSelector } from '../../../hooks/redux'
import { getComplexityColor } from '../../../utils/helpers'

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const QuestionDetailsModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const currentQuestion = useAppSelector(selectCurrentQuestion)

  if (!currentQuestion) return null

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog sx={{ maxWidth: 700, width: '100%', overflowY: 'auto' }}>
        <Typography level="h2">Question Details</Typography>
        <Stack spacing={2} mt={2}>
          <Box>
            <Typography level="h4">Id</Typography>
            <Typography>{currentQuestion.id}</Typography>
          </Box>
          <Box>
            <Typography level="h4">Title</Typography>
            <Typography>{currentQuestion.title}</Typography>
          </Box>
          <Box>
            <Typography level="h4">Description</Typography>
            <Box className="mdOverride">
              <ReactMarkdown
                // @ts-ignore: Fix due to type conflicts with ReactMarkdown and rehypeRaw
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {currentQuestion.description}
              </ReactMarkdown>
            </Box>
          </Box>
          <Box>
            <Typography level="h4">Category</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {currentQuestion.category.map((cat) => (
                <Chip key={cat} color="primary" variant="solid">
                  {cat}
                </Chip>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography level="h4">Complexity</Typography>
            <Typography color={getComplexityColor(currentQuestion.complexity)}>
              {currentQuestion.complexity}
            </Typography>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}

export default QuestionDetailsModal
