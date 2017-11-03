<template>
  <div class="columns">

    <div class="column is-offset-3">

      <transition-group name="fade" tag="ul">
          <li :key="entry.date" v-for="entry in changelogComputed">
            <a @click="change(entry)">{{ entry.date }}</a>
            <ul v-for="ship in entry.diffReports" v-if="entry.collapsed">
              <li>
                <h4>{{ ships[ship.id].name }}</h4>

                <ul>
                  <li v-for="field in ship.diffReport.shipFieldChanges">
                      <p v-if="field.diffType == 'ADDED'">
                        Added <i>{{ dataFields[field.dataType].name }}</i> (<code>{{ field.changed }}</code>)
                      </p>
                      <p v-else-if="field.diffType == 'MODIFIED'">
                        Modified <i>{{ dataFields[field.dataType].name  }}</i> <code>{{ field.original + dataFields[field.dataType].unit }}</code> -> <code>{{ field.changed + dataFields[field.dataType].unit }}</code>
                      </p>
                      <p v-else-if="field.diffType == 'REMOVED'">
                        Removed <i>{{ dataFields[field.dataType].name }}</i> (<code>{{ field.original }}</code>)
                      </p>
                      <p v-else>#ERROR1: {{ field }}</p>
                  </li>
                </ul>

                <ul>
                  <li v-for="(field,name) in ship.diffReport.compiledChanges">
                    <span>{{ name }}</span>
                    <ul>
                      <li v-for="(components, componentType) in field">
                        <span>{{ componentTypeFields[componentType].name }}</span>

                        <ul>
                          <li v-for="componentFields,key in components">

                            <span v-if="key == -1">
                              <span v-if="componentFields[0].diffType == 'ADDED'">
                                Added one new component.
                              </span>
                              <span v-else-if="componentFields[0].diffType == 'REMOVED'">
                                Removed this component.
                              </span>
                              <span v-else>#ERROR2: {{ componentFields }}</span>
                            </span>

                            <div v-else>
                              <span>Placeholder</span>
                              <ul>
                                <li v-for="componentField in componentFields">

                                    <span v-if="componentField.diffType == 'ADDED'">
                                      Added <i>{{ componentField.componentName }}</i>
                                    </span>
                                    <span v-else-if="componentField.diffType == 'MODIFIED'">
                                      Modified <i>{{ compiledFields[componentField.field].name }}</i> <code>{{ componentField.original }}</code> -> <code>{{ componentField.changed }}</code>
                                    </span>
                                    <span v-else-if="componentField.diffType == 'REMOVED'">
                                      Removed <i>{{ componentField.componentName }}</i>
                                    </span>
                                    <span v-else>#ERROR3: {{ componentField }}</span>

                                </li>
                              </ul>
                            </div>

                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>

          </li>
      </transition-group>


    </div>

  </div>
</template>

<script>

const changelogData = require('./../../assets/data/changelog.json');
const shipsData = require('./../../assets/data/ships.json');
const compiledFieldsData = require('./../../assets/data/compiledFields.json');
const dataFieldsData = require('./../../assets/data/dataFields.json');
const componentTypeFieldsData = require('./../../assets/data/componentTypeFields.json');

export default {
  name: 'Changelog',
  data: function() {
    return {
      storage: {
        changelog_: changelogData,
      },
      ships: shipsData,
      compiledFields: compiledFieldsData,
      dataFields: dataFieldsData,
      componentTypeFields: componentTypeFieldsData
    }
  },
  methods: {
    change: function(e) {
      e.collapsed = !e.collapsed;
    }
  },
  computed: {
    changelogComputed: function() {
      return this.storage.changelog_;
    }
  },
  created: function() {
    this.storage.changelog_.forEach(function(e) { e.collapsed = true; })
  }
}
</script>
