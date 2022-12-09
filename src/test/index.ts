import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useTest = () => {
  const navigate = useNavigate()
  const [tableData, setTableData] = useState<string | undefined>()
  const [tableAction, setTableAction] = useState<NodeListOf<Element>>()

  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // const tableAct = document.querySelectorAll('.ant-table-thead th')
      // setTableAction(tableAct)

      const tableElem = document.querySelector('.ant-table-wrapper .ant-table-row td span')?.innerHTML
      //@ts-ignore
      console.log("LOG -> tableElem", tableElem)
      setTableData(tableElem)
    }
  });

  useEffect(() => {
    console.log(tableData)
  }, [tableData])

  useEffect(() => {
    console.log(tableAction)
  }, [tableAction])

  const navigateToUsersPage = () => {
    navigate('/users')
  }

  return {navigateToUsersPage}
}

export default useTest