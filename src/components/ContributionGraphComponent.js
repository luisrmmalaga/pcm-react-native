import { Badge, HStack, VStack } from '@react-native-material/core'
import {
  getContributionGraphicDataFormatted,
  getEndDate,
  getFormattedDate,
} from '@tools/graphicDataFormatter'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { ContributionGraph } from 'react-native-chart-kit'
import DropDownPicker from 'react-native-dropdown-picker'
import DataCard from '../components/DataCard'
import { getCheckpointsByUserIdAndFavName } from '../services/checkpoints_service_api_calls'

const screenWidth = Dimensions.get('window').width

const ContributionGraphComponent = ({ props }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([])
  const [usersData, setUsersData] = useState([])

  const [squareInfo, setSquareInfo] = useState({
    count: null,
    date: null,
  })

  useEffect(() => {
    setItems(
      props.selectData.map((fav, index) => {
        return {
          label: fav.nombre,
          value: fav.nombre + '-' + fav.idUsuario + '-' + index,
        }
      })
    )
  }, [])

  const getNameAndUser = (value) => {
    return { nombre: value.split('-')[0], user: value.split('-')[1] }
  }

  const getContributionGraphicData = (favSelected) => {
    if (favSelected) {
      getCheckpointsByUserIdAndFavName(getNameAndUser(favSelected))
        .then((result) => {
          setUsersData(getContributionGraphicDataFormatted(result))
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <VStack center spacing={10}>
      <Badge label={props.title} color="#023047" />
      <HStack>
        <DataCard
          props={{
            data: {
              title: 'Fecha',
              value: getFormattedDate(squareInfo.date) ?? '',
            },
          }}
        />
        <DataCard
          props={{
            data: {
              title: 'Usuarios',
              value: squareInfo.count ?? '',
            },
          }}
        />
      </HStack>
      <ContributionGraph
        values={usersData}
        endDate={getEndDate()}
        numDays={95}
        width={screenWidth * 0.9}
        height={220}
        showOutOfRangeDays={true}
        chartConfig={props.chartConfig}
        onDayPress={(squareData) => {
          setSquareInfo(squareData)
        }}
      />
      <DropDownPicker
        placeholder="Selecciona un punto favorito"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ width: screenWidth * 0.9 }}
        onChangeValue={(value) => getContributionGraphicData(value)}
      />
    </VStack>
  )
}

export default ContributionGraphComponent
